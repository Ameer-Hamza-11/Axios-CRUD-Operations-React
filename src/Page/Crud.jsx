import React, { useEffect, useState } from 'react';
import { delData, getData } from '../Api/api';
import { Form } from '../Components/Form';

export const Crud = () => {
    const [getApiData, setGetApiData] = useState([]);
    const [editData, setEditData] = useState({})






    const apiGetFunction = async () => {
        const res = await getData();
        console.log(res.data);
        setGetApiData(res.data);
    };

    useEffect(() => {
        apiGetFunction();

    }, []);



    const hanldeDelFunction = async (id) => {
        try {
            const res = await delData(id);
            if (res.status === 200) {
                const deleteData = getApiData
                    .filter((curTask) => {
                        return curTask.id !== id
                    }).map((pre, index) => ({
                        ...pre,
                        id: index + 1

                    }))
                setGetApiData(deleteData)
            }


        } catch (error) {
            console.log(error);

        }
    }



    const editApiData = (currpost) => {
        setEditData(currpost)
    }



    return (
        <>
            <section>
                <Form
                    getApiData={getApiData} setGetApiData={setGetApiData}
                    editData={editData} setEditData={setEditData}
                />
            </section>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.isArray(getApiData) &&  getApiData.map((curTask) => (
                    <li
                        key={curTask.id}
                        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-transform duration-300"
                    >
                        <strong className="text-xs text-pink-400">Post ID: {curTask.id}</strong>
                        <h1 className="text-xl font-bold text-white mt-2 mb-1">Title: {curTask.title}</h1>
                        <p className="text-gray-300 mb-4">Body: {curTask.body}</p>
                        <div className="flex gap-4">
                            <button className="cursor-pointer px-4 py-2 bg-gradient-to-r from-green-400 to-teal-500 text-white font-medium rounded-lg shadow hover:opacity-90 transition"
                                onClick={() => editApiData(curTask)}
                            >
                                Edit
                            </button>
                            <button className="cursor-pointer px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-lg shadow hover:opacity-90 transition"
                                onClick={() => hanldeDelFunction(curTask.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};
