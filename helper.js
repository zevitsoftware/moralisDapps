class DBHelper {
    getdata(koneksi, tabel, field = "*", kondisi = "", order = "", limit = "") {
        return new Promise((resolve, reject) => {
            let ret = {}
            koneksi.getConnection(function (err, connection) {
                if (err){
                    ret.err = err;
                    ret.success = false;
                    reject(ret);
                }else{
                    let sql = "select " + field + " from " + tabel;
                    if (kondisi != "") {
                        sql = sql + " Where " + kondisi;
                    }
                    if (order != "") {
                        sql = sql + " order by " + order;
                    }
                    if (limit != "") {
                        sql = sql + " LIMIT " + limit;
                    }
                    try {
                        connection.query(sql, function (err, result) {
                            connection.release();
                            if (err) {
                                ret.data = null;
                                ret.err = err;
                                ret.success = false;
                            } else {
                                ret.data = result;
                                ret.length = result.length;
                                ret.err = false;
                                ret.success = true;
                            }
                            resolve(ret);
                        });
                    } catch (e) {
                        ret.data = null;
                        ret.err = e;
                        ret.success = false;
                        reject(ret);
                    }
                }
            })
        });
    }

    query(koneksi, esql) {
        return new Promise((resolve, reject) => {
            koneksi.getConnection(function (err, connection) {
                let ret = {}
                let sql = esql;
                if (err){
                    ret.err = err;
                    ret.success = false;
                    resolve(ret);
                }else{
                    try {
                        connection.query(sql, function (err, result) {
                            connection.release();
                            if (err) {
                                ret.data = null;
                                ret.err = err;
                                ret.success = false;
                            } else {
                                ret.data = result;
                                ret.length = result.length;
                                ret.err = false;
                                ret.insertid = result.insertId;
                                ret.success = true;
                            }
                            resolve(ret);
                        });
                    } catch (e) {
                        ret.data = null;
                        ret.err = e;
                        ret.success = false;
                        reject(ret);
                    }
                }
            })
        });
    }

    getfielddata(koneksi, tabel, field, kondisi = "", order = "") {
        return new Promise((resolve, reject) => {
            koneksi.getConnection(function (err, connection) {
                let ret = {}
                if (err){
                    ret.err = err;
                    ret.success = false;
                    reject(ret);
                }else{
                    let sql = "select " + field + " from " + tabel;
                    if (kondisi != "") {
                        sql = sql + " Where " + kondisi;
                    }
                    if (order != "") {
                        sql = sql + " order by " + order+" LIMIT 1";
                    }
                    try {
                        connection.query(sql, function (err, result) {
                            connection.release();
                            if (err) {
                                ret.data = null;
                                ret.err = err;
                                ret.sql = sql;
                                ret.success = false;
                            } else {
                                ret.data = result[0];
                                ret.length = result.length;
                                ret.sql = sql;
                                ret.err = false;
                                ret.success = true;
                            }
                            resolve(ret);
                        });
                    } catch (e) {
                        ret.data = null;
                        ret.err = e;
                        ret.success = false;
                        reject(ret);
                    }
                }
            })
        });
    }

    get_detaildata(koneksi, tabel, field, kondisi = "", order = "", limit = "") {
        return new Promise((resolve, reject) => {
            koneksi.getConnection(function (err, connection) {
                let ret = {};
                if (err){
                    ret.err = err;
                    ret.success = false;
                    reject(ret);
                }else{
                    let sql = "select " + field + " from " + tabel;
                    if (kondisi != "") {
                        sql = sql + " Where " + kondisi;
                    }
                    if (order != "") {
                        sql = sql + " order by " + order;
                    }
                    if (limit != "") {
                        sql = sql + " LIMIT " + limit;
                    }
                    try {
                        connection.query(sql, function (err, result) {
                            connection.release();
                            if (err) {
                                ret.data = null;
                                ret.err = err;
                                ret.success = false;
                            } else {
                                ret.data = result[0][field];
                                ret.length = result.length;
                                ret.err = false;
                                ret.success = true;
                            }
                            resolve(ret);
                        });
                    } catch (e) {
                        ret.data = null;
                        ret.err = e;
                        ret.success = false;
                        reject(ret);
                    }
                }
            })
        });
    }

    update(koneksi, tabel, field, kondisi, limit) {
        return new Promise((resolve, reject) => {
            koneksi.getConnection(function (err, connection) {
                let ret = {};
                if (err){
                    ret.err = err;
                    ret.success = false;
                    reject(ret);
                }else{
                    let sql = "update " + tabel + " set " + field + " Where " + kondisi + " LIMIT " + limit;
                    try {
                        connection.query(sql, function (err, result) {
                            connection.release();
                            if (err) {
                                ret.data = null;
                                ret.err = err;
                                ret.success = false;
                            } else {
                                ret.data = result;
                                ret.err = false;
                                ret.success = true;
                            }
                            resolve(ret);
                        });
                    } catch (e) {
                        ret.data = null;
                        ret.err = e;
                        ret.success = false;
                        reject(ret);
                    }
                }
            })
        });
    }

    insert(koneksi, tabel, field) {
        return new Promise((resolve, reject) => {
            koneksi.getConnection(function (err, connection) {
                let ret = {}
                if (err){
                    ret.err = err;
                    ret.success = false;
                    reject(ret);
                }else{
                    let sql = "insert into " + tabel + " set " + field;
                    try {
                        connection.query(sql, function (err, result) {
                            connection.release();
                            if (err) {
                                ret.sql = sql;
                                ret.data = null;
                                ret.err = err;
                                ret.success = false;
                            } else {
                                ret.sql = sql;
                                ret.insertid = result.insertId;
                                ret.data = result;
                                ret.err = false;
                                ret.success = true;
                            }
                            resolve(ret);
                        });
                    } catch (e) {
                        ret.data = null;
                        ret.err = e;
                        ret.success = false;
                        reject(ret);
                    }
                }
            })
        });
    }

    multi(koneksi, sql) {
        return new Promise((resolve, reject) => {
            koneksi.getConnection(function (err, connection) {
                let ret = {};
                if (err){
                    ret.err = err;
                    ret.success = false;
                    reject(ret);
                }else{
                    try {
                        connection.query(sql, function (err, result) {
                            connection.release();
                            if (err) {
                                ret.data = null;
                                ret.err = err;
                                ret.success = false;
                            } else {
                                ret.data = result;
                                ret.err = false;
                                ret.success = true;
                            }
                            resolve(ret);
                        });
                    } catch (e) {
                        ret.data = null;
                        ret.err = e;
                        ret.success = false;
                        reject(ret);
                    }
                }
            })
        });
    }

}

exports.DBHelper = new DBHelper();