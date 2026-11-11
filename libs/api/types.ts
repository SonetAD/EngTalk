/** Shape of the error body returned by the EngTalk backend. */
export type ApiErrorBody = {
  errors?: {
    validation?: { msg?: string };
    common?: { msg?: string };
  };
};
