// 数据字段名转化,保证组件内部一套逻辑名称的固定
export function transferDatabaseData(data) {
    if (Object.prototype.toString.call(data) !== "[object Object]") return;
    return {
        birthOrigin: data.location || "",
        code: data.jobnumber || "",
        contractEndDate: data.expiredate || "",
        contractType:data.contractType || "",
        currentTitle: data.techName1 || "",
        currentTitleGetDate: data.acquireDate1 || "",
        currentTitleHireDate: data.hireDate1 || "",
        degree: data.degree || "",
        gender: data.sex || "",
        graduateDate: data.graduation || "",
        graduateSchool: data.school || "",
        identityNum: data.idcard || "",
        joinSjyDate: data.joindate || "",
        joinWorkDate: data.workdate || "",
        major: data.major || "",
        userName: data.username || "",
        political: data.politics || "",
        preTitle: data.techName2 || "",
        preTitleGetDate: data.acquireDate2 || "",
        preTitleGetHireDate: data.hireDate2 || "",
        racial: data.nation || "",
        tel: data.tel || "",
        workAge: data.workyear || "",
        password:data.password,
        uid:data.uid
    }
}

export function transferLocalData(data) {
    if (Object.prototype.toString.call(data) !== "[object Object]") return;
    return {
        location: data.birthOrigin || "",
        jobnumber: data.code || "",
        expiredate: data.contractEndDate || "",
        contractType:data.contractType || "",
        techName1: data.currentTitle || "",
        acquireDate1: data.currentTitleGetDate || "",
        hireDate1: data.currentTitleHireDate || "",
        degree: data.degree || "",
        sex: data.gender || "",
        graduation: data.graduateDate || "",
        school: data.graduateSchool || "",
        idcard: data.identityNum || "",
        joindate: data.joinSjyDate || "",
        workdate: data.joinWorkDate || "",
        major: data.major || "",
        username: data.userName || "",
        politics: data.political || "",
        techName2: data.preTitle || "",
        acquireDate2: data.preTitleGetDate || "",
        hireDate2: data.preTitleGetHireDate || "",
        nation: data.racial || "",
        tel: data.tel || "",
        workyear:data.workAge || "",
        password:data.password || "123",
        uid:data.uid
    }
}