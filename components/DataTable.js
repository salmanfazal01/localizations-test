import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useState } from "react";
import { useEffect } from "react";

const parseColumns = (data = {}, languages) => {
  return [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      editable: true,
    },
    {
      field: "word",
      headerName: "WORD",
      width: 250,
      editable: true,
    },
    ...languages.map((lang) => ({
      field: lang,
      headerName: lang.toUpperCase(),
      width: 250,
      editable: true,
    })),
  ];
};

const parseRows = (data = {}) => {
  if (data.en) {
    return [
      ...Object.keys(data.en).map((_key, i) => ({
        id: i,
        word: _key,
        en: data?.en?.[_key],
        fr: data?.fr?.[_key],
        de: data?.de?.[_key],
        pt: data?.pt?.[_key],
        es: data?.es?.[_key],
      })),
    ];
  }
};

const DataTable = ({ data: propsData, handleCellChange, languages }) => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (propsData) {
      setColumns(parseColumns(propsData, languages));
      setRows(parseRows(propsData));
    }
  }, [propsData, languages]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        onCellEditCommit={(e) => {
          if (handleCellChange) handleCellChange(e, rows);
        }}
      />
    </div>
  );
};

export default DataTable;
