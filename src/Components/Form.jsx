import React, { useEffect, useState } from 'react';
import { addData, editDataPost } from '../Api/api';

export const Form = ({ getApiData, setGetApiData, editData, setEditData }) => {
    const [userInput, setUserInput] = useState({
        title: '',
        body: ''
    })

    const isEmpty = Object.keys(editData).length === 0;
    useEffect(() => {
        setUserInput({
            title: editData.title || '',
            body: editData.body || '',
        })
    }, [editData])

    const handleInputData = (e) => {
        const { name, value } = e.target
        // const name = e.target.name;
        // const value = e.target.value;
        setUserInput((prev) => ({ ...prev, [name]: value }))
    }
    const addPostData = async () => {
        const res = await addData(userInput)
        console.log(res);
        if (res.status === 201) {
            setGetApiData([...getApiData, res.data])
            setUserInput({
                title: '',
                body: ''
            })
        }
    }

    const editPost = async () => {
        try {
            const res = await editDataPost(editData.id, userInput)
            console.log(res);
            if (res.status === 200) {
                setGetApiData((prev) => {
                    return prev.map((curTask) => {
                        return curTask.id === res.data.id ? res.data : curTask
                    })
                })
                setUserInput({ title: '', body: '' })
                setEditData({})
            }

        } catch (error) {
            console.log(error);

        }
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();
        isEmpty ? addPostData() : editPost()
    }
    return (
        <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto mt-10 mb-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Add New Post </h2>
            <p className="text-sm text-yellow-200 italic text-center">
                Note: New post will be added at the bottom of the list.
            </p>

            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={userInput.title}
                    onChange={handleInputData}
                    placeholder="Enter post title"
                    className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
                />
            </div>

            <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-200 mb-1">
                    Body
                </label>
                <input
                    type="text"
                    id="body"
                    name="body"
                    value={userInput.body}
                    onChange={handleInputData}
                    placeholder="Enter post content"
                    className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
                />
            </div>

            <button
                type="submit"
                className="cursor-pointer w-full py-3 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 text-white font-semibold rounded-md hover:opacity-90 transition-all duration-300 shadow-lg"
                value={isEmpty ? ' 🚀 Add Post' : '🚀 Edit Post'}
            >
                {isEmpty ? ' 🚀 Add Post' : '🚀 Edit Post'}
            </button>
        </form>
    );
};
