// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {collection, doc, getDocs,getDoc,  getFirestore, query, where} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWYB6NnGsEBAkx6RCol-i2P9tYoc4XSdQ",
  authDomain: "vanlife-e93e2.firebaseapp.com",
  projectId: "vanlife-e93e2",
  storageBucket: "vanlife-e93e2.appspot.com",
  messagingSenderId: "308513663407",
  appId: "1:308513663407:web:d37647b254a274bd59275a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

export async function getVans(id) {
   const querySnapshot = await getDocs(vansCollectionRef)
   const dataArr = querySnapshot.docs.map(doc=>({
    ...doc.data(), 
    id: doc.id
   }))
   console.log('dataArr', dataArr)
   return dataArr
}

export async function getVan(id) {
    const docRef =  doc(db, "vans", id)
    const vanSnapShot = await getDoc(docRef)
    return {
        ...vanSnapShot.data(), 
        id:vanSnapShot.id
    }
 
 }


// export async function getVans(id) {
//     const url = id ? `/api/vans/${id}` : "/api/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }


export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map(doc=>({
     ...doc.data(), 
     id: doc.id
    }))
    console.log('dataArr', dataArr)
    return dataArr
 }

 export async function getHostVan(id) {
    const docRef =  doc(db, "vans", id)
    const vanSnapShot = await getDoc(docRef)
    return {
        ...vanSnapShot.data(), 
        id:vanSnapShot.id
    }
 
 }


// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }


export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}