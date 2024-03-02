import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Header from "./Header";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firestore";

const Dashboard = ({ setIsAuthenticated }) => {
  const [courses, setCourses] = useState();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getCourses = async () => {
    const querySnapshot = await getDocs(collection(db, "course-list"));
    const courses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCourses(courses);
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleEdit = (id) => {
    const [course] = courses.filter((course) => course.id === id);

    setSelectedCourse(course);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.value) {
        const [course] = courses.filter((course) => course.id === id);

        deleteDoc(doc(db, "course-list", id));

        Swal.fire({
          icon: "Success",
          title: "Course Deleted",
          text: ` ${course.title}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const coursesCopy = courses.filter((course) => course.id !== id);
        setCourses(coursesCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            courses={courses}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          courses={courses}
          setCourses={setCourses}
          setIsAdding={setIsAdding}
          getCourses={getCourses}
        />
      )}
      {isEditing && (
        <Edit
          courses={courses}
          selectedCourse={selectedCourse}
          setCourses={setCourses}
          setIsEditing={setIsEditing}
          getCourses={getCourses}
        />
      )}
    </div>
  );
};

export default Dashboard;
