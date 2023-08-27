const ValidationError = require("../../error/validationError");
const getDisInM = require("../../util/distance");

const selectShift = ({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
  profileRepository,
}) => {
  return async function select(user, id, query) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    const loggedInUserProfile = await profileRepository.getByUserId(
      loggedInUser.id
    );

    if (!loggedInUserProfile) {
      throw new ValidationError("Please Set up address before viewing shifts!");
    }

    //applied shifts -> get all the applied shifts and return
    console.log("Query is Applied", query.isApplied);
    let isApplied = false;
    if (query.isApplied) {
      if (!["true", "false"].includes(query.isApplied)) {
        throw new ValidationError("isApplied flag can only be true or false");
      }
      if (query.isApplied == "true") {
        isApplied = true;
      }
    }

    if (isApplied) {
      const appliedShifts = await userShiftRepository.getAllAppliedShiftForTsm(
        loggedInUser.id,
        query
      );
      const appliedShiftsMod = appliedShifts.map((al) => {
        return {
          id: al.shift.id,
          clinicPersonnelId: al.shift.clinicPersonnelId,
          clinicId: al.shift.clinicId,
          shiftDate: al.shift.shiftDate,
          startTime: al.shift.startTime,
          endTime: al.shift.endTime,
          description: al.shift.description,
          jobRole: al.shift.jobRole,
          rate: al.shift.rate,
          clinicName: al.shift.clinic.officeName,
          clinicAddress: al.shift.clinic.address + ", " + al.shift.clinic.city,
          isApplied: al.isApplied,
          isOffered: al.isOffered,
          isAcceptedByTSM: al.isAcceptedByTSM,
          isAcceptedByCP: al.isAcceptedByCP,
          isMarkCompletedByTSM: al.isMarkCompletedByTSM,
          isMarkCompletedByCP: al.isMarkCompletedByCP,
        };
      });
      const appliedShiftsTotal =
        await userShiftRepository.getAllAppliedShiftForTsmTotal(
          loggedInUser.id,
          query
        );
      return {
        clinic: appliedShiftsMod,
        count: appliedShiftsTotal.length,
      };
    }

    // if not get the available shifts
    const allClinics = await clinicRepository.get();

    console.log("QUery is");
    console.log(query);

    let rad = loggedInUserProfile.address.radius || 20;
    if (query.radius) {
      rad = query.radius;
      console.log("The radius is " + rad);
    }

    let rate = 0;
    if (query.rate) {
      rate = query.rate;
      console.log("The radius is " + rate);
    }
    //Get all the clinics withIn the Radius
    let allclinicsIntheRadius = [];
    for (let clinic of allClinics) {
      if (clinic.lattitude != null && clinic.longitude != null) {
        const dis = await getDisInM({
          userCord: {
            lat: loggedInUserProfile.address.lattitude,
            lng: loggedInUserProfile.address.longitude,
          },
          clinicCord: { lat: clinic.lattitude, lng: clinic.longitude },
        });
        console.log("dis / 1000");
        console.log(dis / 1000);
        if (dis / 1000 <= rad) {
          allclinicsIntheRadius.push({ ...clinic, distanceInKm: dis / 1000 });
        }
      }
    }
    //Get all the Shift with the clinics
    allclinicsIntheRadius = allclinicsIntheRadius.sort(
      (cl1, cl2) => cl1.distanceInKm - cl2.distanceInKm
    );
    let allShifts = [];
    let i = 0;
    for (const clinicInRad of allclinicsIntheRadius) {
      let shifts = [];
      shifts = await clinicRepository.getAllShiftsInFuture(clinicInRad.id);
      console.log("++i");
      console.log(i);
      for (const shift of shifts) {
        allShifts.push({ ...shift, distanceInKm: clinicInRad.distanceInKm });
      }
    }

    //rate filter
    allShifts = allShifts.filter((as) => as.rate >= rate);

    console.log("all shift");
    console.log(allShifts.length);

    let appliedShifts = await userShiftRepository.getAllAppliedShift(
      loggedInUser.id
    );

    console.log("applied shift");
    console.log(appliedShifts.length);

    let appliedShiftIds = [];
    for (const s of appliedShifts) {
      appliedShiftIds.push(s.shiftId);
    }

    console.log("applied shift ids");
    console.log(appliedShiftIds.length);

    let combinedShifts = [];

    for (const allshift of allShifts) {
      const clinicInfo = await clinicRepository.getOne(allshift.clinicId);
      if (!appliedShiftIds.includes(allshift.id)) {
        const modShiftDataNull = {
          ...allshift,
          clinicName:
            clinicInfo != null ? clinicInfo.officeName : "Clinic Name Deleted",
          clinicAddress:
            clinicInfo != null ? clinicInfo.address : "Clinic Address Deleted",
          isApplied: false,
          isAcceptedByTSM: false,
          isAcceptedByCP: false,
          isOffered: false,
          isMarkCompletedByTSM: false,
          isMarkCompletedByCP: false,
        };
        combinedShifts.push(modShiftDataNull);
        console.log("combinedShifts=>" + combinedShifts.length);
      }
    }

    const { page, size } = query;

    if (page <= 0 || size <= 0) {
      throw new ValidationError("Page or size can not be less than 1");
    }

    let searchfiltered = combinedShifts;

    if (query) {
      if (query.search) {
        console.log("Searching....");
        searchfiltered = searchfiltered.filter(
          (sh) =>
            sh.clinicName.toLowerCase().includes(query.search.toLowerCase()) ||
            sh.clinicAddress
              .toLowerCase()
              .includes(query.search.toLowerCase()) ||
            sh.jobRole.toLowerCase().includes(query.search.toLowerCase())
        );
      }
      if (query.isAcceptedByTSM) {
        let isTrueSet = query.isAcceptedByTSM.toLowerCase() === "true";
        console.log("Boolean(query.isAccepted)");
        console.log(Boolean(query.isAcceptedByTSM));
        console.log(query.isAcceptedByTSM);
        return {
          clinic: searchfiltered
            .filter((cs) => cs.isAcceptedByTSM == isTrueSet)
            .slice(
              (Number(page) - 1) * Number(size),
              (Number(page) - 1) * Number(size) + Number(size)
            ),
          count: searchfiltered.filter((cs) => cs.isAcceptedByTSM == isTrueSet)
            .length,
        };
      }

      if (query.isAcceptedByCP) {
        let isTrueSet = query.isAcceptedByCP.toLowerCase() === "true";
        console.log("Boolean(query.isAccepted)");
        console.log(Boolean(query.isAcceptedByCP));
        console.log(query.isAcceptedByCP);
        return {
          clinic: searchfiltered
            .filter((cs) => cs.isAcceptedByCP == isTrueSet)
            .slice(
              (Number(page) - 1) * Number(size),
              (Number(page) - 1) * Number(size) + Number(size)
            ),
          count: searchfiltered.filter((cs) => cs.isAcceptedByCP == isTrueSet)
            .length,
        };
      }

      if (query.isOffered) {
        let isTrueSet = query.isOffered.toLowerCase() === "true";
        console.log("Boolean(query.isOffered)");
        console.log(Boolean(query.isOffered));
        console.log(query.isOffered);
        return {
          clinic: searchfiltered
            .filter((cs) => cs.isOffered == isTrueSet)
            .slice(
              (Number(page) - 1) * Number(size),
              (Number(page) - 1) * Number(size) + Number(size)
            ),
          count: searchfiltered.filter((cs) => cs.isOffered == isTrueSet)
            .length,
        };
      }

      if (query.isMarkCompletedByTSM) {
        let isTrueSet = query.isMarkCompletedByTSM.toLowerCase() === "true";
        console.log("Boolean(query.isMarkCompletedByTSM)");
        console.log(Boolean(query.isMarkCompletedByTSM));
        console.log(query.isMarkCompletedByTSM);
        return {
          clinic: searchfiltered
            .filter((cs) => cs.isMarkCompletedByTSM == isTrueSet)
            .slice(
              (Number(page) - 1) * Number(size),
              (Number(page) - 1) * Number(size) + Number(size)
            ),
          count: searchfiltered.filter(
            (cs) => cs.isMarkCompletedByTSM == isTrueSet
          ).length,
        };
      }

      if (query.isMarkCompletedByCP) {
        let isTrueSet = query.isMarkCompletedByCP.toLowerCase() === "true";
        console.log("Boolean(query.isMarkCompletedByCP)");
        console.log(Boolean(query.isMarkCompletedByCP));
        console.log(query.isMarkCompletedByCP);
        return {
          clinic: searchfiltered
            .filter((cs) => cs.isMarkCompletedByCP == isTrueSet)
            .slice(
              (Number(page) - 1) * Number(size),
              (Number(page) - 1) * Number(size) + Number(size)
            ),
          count: searchfiltered.filter(
            (cs) => cs.isMarkCompletedByCP == isTrueSet
          ).length,
        };
      }
    }

    console.log("Query.search");
    console.log(query.search);

    if (query.search) {
      return {
        clinic: searchfiltered.slice(
          (Number(page) - 1) * Number(size),
          (Number(page) - 1) * Number(size) + Number(size)
        ),
        count: searchfiltered.length,
      };
    }

    return {
      clinic: combinedShifts.slice(
        (Number(page) - 1) * Number(size),
        (Number(page) - 1) * Number(size) + Number(size)
      ),
      count: combinedShifts.length,
    };
  };
};

module.exports = selectShift;
