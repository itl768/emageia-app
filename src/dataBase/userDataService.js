import firebase from 'firebase';
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid';

const uudigen = () => {
    return uuidv4();
};


export const writeUserData = async (data) => {

    const users = await getData();
    const filter = _.findIndex(users, { email: data.email })
    if (filter >= 0) {
        return { type: "error", message: "Email already exists" }
    }
    else {
        const id = uudigen()
        firebase.database().ref('/userData/' + id).set(
            {
                key: id,
                contactName: _.get(data, "contactName", ""),
                phoneNumber: _.get(data, "phoneNumber", ""),
                address: _.get(data, "address", ""),
                email: _.get(data, "email", ""),
            }

        )
        return { type: "success", message: "Successfully added" }
    }
}

export const updateData = async (data) => {
    const users = await getData();
    const usersWithoutCurrent = _.remove(users, function (n) {
        return data.key !== n.key
    });
    const filter = _.findIndex(usersWithoutCurrent, { email: data.email })
    if (filter >= 0) {
        return { type: "error", message: "Email already exists" }
    }
    else {

        firebase.database().ref('/userData/' + _.get(data, "key", "")).update(
            {
                key: _.get(data, "key", ""),
                contactName: _.get(data, "contactName", ""),
                phoneNumber: _.get(data, "phoneNumber", ""),
                address: _.get(data, "address", ""),
                email: _.get(data, "email", ""),
            }

        )
        return { type: "success", message: "Successfully Updated" }
    }

}

export const deleteData = async (data) => {

    firebase.database().ref('/userData/' + _.get(data, "key", "")).remove()
    return { type: "success", message: "Successfully Deleted" }
}

export const getData = async () => {
    const array = [];
    await firebase.database().ref('/userData').get()
        .then((snapshot) => {
            if (snapshot.exists()) {

                Object.values(snapshot.val()).forEach(e => array.push(e))

            }
        }).catch((error) => {
            console.error(error);
        });
    return array



}


export const generateRandomdata=async( )=>{


    for(let i=0;i<20;i++){
      const  data={
            contactName: "Test Name"+i,
            phoneNumber:_.random(1000000000, 9999999999),
            email:i+"testEmail@gmail.com",
            address:"No-"+i+",testStreet,testTown"
          }
        await writeUserData(data)
    }

}

