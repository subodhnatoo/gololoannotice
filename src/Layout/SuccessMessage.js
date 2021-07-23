import React from "react";

export const SuccessMessage = (props) => {
  return (
    <div class="alert alert-primary" role="alert">
        console.log(props.message);
      {props.message}
    </div>
  );
};
