import React from "react";

const Table = ({ courses, handleEdit, handleDelete }) => {
  // Function to compare dates for sorting
  const compareDates = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  };

  // Sort courses by upload date
  const sortedCourses = courses ? [...courses].sort(compareDates) : [];

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Upload Date</th>
            <th>Last Edited</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedCourses.length > 0 ? (
            sortedCourses.map((course, id) => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.date}</td>
                <td>{course.editDate}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(course.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
