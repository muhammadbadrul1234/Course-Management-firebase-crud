import React, { useState } from "react";
import Swal from "sweetalert2";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firestore";

const Edit = ({
  courses,
  selectedCourse,
  setCourses,
  setIsEditing,
  getCourses,
}) => {
  const id1 = selectedCourse.id;
  const [title, settitle] = useState(selectedCourse.title);
  const [description, setDescription] = useState(selectedCourse.description);
  const [date, setUploadDate] = useState(selectedCourse.date);
  const [category, setCategory] = useState(selectedCourse.category);
  const [id, setId] = useState(selectedCourse.id);
  const [creator, setCreator] = useState(selectedCourse.creator);
  const [price, setPrice] = useState(selectedCourse.price);

  const getCurrentDateTime = () => {
    const currentDate = new Date();

    // Get date components
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based
    const day = currentDate.getDate();

    // Get time components
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    // Add leading '0' if minutes or seconds are less than 10
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    // Format the date and time
    const formattedDateTime = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    } ${hours}:${formattedMinutes}:${formattedSeconds}`;

    return formattedDateTime;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const editDate = getCurrentDateTime();

    if (
      !title ||
      !description ||
      !category ||
      !id ||
      !creator ||
      !price
    ) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const course = {
      title,
      description,
      date,
      editDate,
      id,
      category,
      creator,
      price,
    };

    await setDoc(doc(db, "course-list", id), {
      ...course,
    });

    setCourses(courses);
    setIsEditing(false);
    getCourses();

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `${course.title}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Course</h1>

        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="name">ID</label>
        <input
          id="id"
          type="text"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <label htmlFor="name">Category</label>
        <input
          id="category"
          type="text"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <label htmlFor="name">Creator</label>
        <input
          id="creator"
          type="text"
          name="creator"
          value={creator}
          onChange={(e) => setCreator(e.target.value)}
        />
        <label htmlFor="name">Price</label>
        <input
          id="price"
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
