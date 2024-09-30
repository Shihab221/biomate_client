import React from "react";

const TableComponent = ({ columns, createData, createRows, rows }) => {
  createData();
  createRows();

  return (
    <div className="w-full overflow-hidden mb-12">
      <div className="max-h-[500px] overflow-y-auto">
        <table className="min-w-full sticky top-0 text-slate-800">
          <thead className="bg-slate-800 text-white font-bold">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="py-3 px-4"
                  style={{ minWidth: column.minWidth }}
                  align={column.align}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="bg-buttonface border"
                style={{ height: "90px" }}
              >
                {columns.map((column, colIndex) => {
                  const value = row[column.id];
                  return (
                    <td
                      key={colIndex}
                      className="py-3 px-4 break-all border"
                      align={column.align}
                    >
                      {column.format && typeof value === "number"
                        ? column.format(value)
                        : value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
