import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useObject } from "react-firebase-hooks/database";
import DataTable from "../components/DataTable";
import firebase from "../config/firebase";
import { LANGUAGES } from "../utils/constants";

const localizations = () => {
  const [message, setMessage] = useState(null);

  const [snapshot, loading, error] = useObject(
    firebase.database().ref("locales")
  );

  const handleCellChange = (_props = {}, rows = []) => {
    const { id, field: lang, value } = _props;

    //if word changed

    //if value changed
    if (id && lang !== "word") {
      const word = rows.find((x) => x.id === id)?.word;
      word &&
        firebase
          .database()
          .ref(`locales/${lang}`)
          .update({ [word]: value })
          .then(() => {
            setMessage("success");
          })
          .catch(() => {
            setMessage("error");
          });
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setMessage(false);
  };

  return (
    <div style={{ height: "calc(100vh - 64px)" }}>
      <DataTable
        data={snapshot?.val()}
        handleCellChange={handleCellChange}
        languages={LANGUAGES}
      />

      {message && (
        <Snackbar
          open={Boolean(message)}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={message || "info"}>
            {message === "success"
              ? "Successfully Updated!"
              : "Error saving to db"}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default localizations;
