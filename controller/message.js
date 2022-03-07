var db = require("../config/config");
var moment = require('moment'); // require



exports.addInbox = async (req, res) => {
    // let body = req.body;
    let id = req.body.id;
    let dest = req.body.dest;

    console.log(id + " cecd " + dest)
    try {
        let data = [];
        await db.collection("inbox")
            .where('conversation', 'array-contains-any', [dest]).orderBy('updatedAt')
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if ((doc.data().conversation[0] == id || doc.data().conversation[1] == id) && (doc.data().conversation[0] == dest || doc.data().conversation[1] == dest)) {
                        data.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    } else {

                    }
                })
            });
        if (data.length == 0) {
            await db.collection("inbox").add({ conversation: [id, dest], updatedAt: moment().format() })
        }
        res.status(200).send({
            error: false,
            message: data
        });
    } catch (e) {
        res.status(500).send({
            error: true,
            message: "Internal server error" + e.message
        });
    }
}


exports.getMessage = async (req, res) => {
    let id = req.params.id;
    let dest = req.params.dest;

    console.log(id + " cecdc " + dest)
    try {
        let data = [];
        await db.collection("messages")
            .where('participant', 'array-contains-any', [id]).orderBy('createdAt')
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.data().participant);
                    if ((doc.data().participant[0] == id || doc.data().participant[1] == id) && (doc.data().participant[0] == dest || doc.data().participant[1] == dest)) {
                        data.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    } else {

                    }
                })
            });
        res.status(200).send({
            error: false,
            message: data
        });
    } catch (e) {
        res.status(500).send({
            error: true,
            message: "Internal server error" + e.message
        });
    }
}


exports.getIfUserActive = async (req, res) => {
    let id = req.params.id;

    try {
        let data = [];
        await db.collection("users")
            .where('id', '==', id)
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    data.push({
                        id: doc.id,
                        ...doc.data()
                    });
                })
            });
        res.status(200).send({
            error: false,
            message: data
        });
    } catch (e) {
        res.status(500).send({
            error: true,
            message: "Internal server error"
        });
    }
}
exports.getInbox = async (req, res) => {
    let id = req.params.id;
    try {
        let data = [];
        await db.collection("inbox")
            .where('conversation', 'array-contains-any', [id]).orderBy('updatedAt')
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    data.push({
                        id: doc.id,
                        ...doc.data()
                    });
                })
            });
        res.status(200).send({
            error: false,
            message: data
        });
    } catch (e) {
        res.status(500).send({
            error: true,
            message: "Internal server error" + e.message
        });
    }
}


