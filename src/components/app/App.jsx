import {
  Card,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

import "./app.css";

const invalidChars = ["+", "e"];

const App = ({
  cardNumber,
  CVV,
  amount,
  expirationDateMonth,
  expirationDateYear,
  setCardNumberHandler,
  setCVVHandler,
  setAmountHandler,
  setExpirationDateMonthHandler,
  setExpirationDateYearHandler,
  errors,
  disableError,
  isButtonDisabled,
  serverError,
  isLoading,
  submitData,
  id,
}) => {
  const validateOnKeyDown = (e) => {
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="app-container">
      {id && (
        <Typography variant="h6" align="center">
          Id вашей карты: {id}
        </Typography>
      )}
      {serverError && (
        <Typography variant="h6" align="center" color="red">
          {serverError}
        </Typography>
      )}
      {isLoading && <CircularProgress />}
      <Card
        className="app-content"
        sx={{ backgroundColor: "rgb(223, 235, 235, 0.3)" }}
      >
        <TextField
          label="Номер карты"
          variant="outlined"
          sx={{ margin: "20px" }}
          type="number"
          onKeyDown={validateOnKeyDown}
          onChange={(e) => setCardNumberHandler(e.target.value)}
          value={cardNumber}
        />

        <TextField
          label="CVV"
          variant="outlined"
          sx={{ margin: "20px" }}
          type="number"
          onKeyDown={validateOnKeyDown}
          onChange={(e) => setCVVHandler(e.target.value)}
          value={CVV}
        />

        <TextField
          label="Сумма $"
          variant="outlined"
          sx={{ margin: "20px" }}
          type="number"
          onKeyDown={validateOnKeyDown}
          onChange={(e) => setAmountHandler(e.target.value)}
          value={amount}
        />

        <div>
          <Typography variant="h6" align="center">
            Срок годности
          </Typography>
          <span className="expiration-container">
            <TextField
              label="Месяц"
              variant="outlined"
              sx={{ margin: "20px" }}
              type="number"
              onKeyDown={validateOnKeyDown}
              onChange={(e) => setExpirationDateMonthHandler(e.target.value)}
              value={expirationDateMonth}
              error={!!errors.expirationDateMonth}
              helperText={errors.expirationDateMonth}
              onFocus={() => {
                disableError("expirationDateMonth");
              }}
            />
            /
            <TextField
              label="Год"
              variant="outlined"
              sx={{ margin: "20px" }}
              type="number"
              onKeyDown={validateOnKeyDown}
              onChange={(e) => setExpirationDateYearHandler(e.target.value)}
              value={expirationDateYear}
              error={!!errors.expirationDateYear}
              helperText={errors.expirationDateYear}
              onFocus={() => {
                disableError("expirationDateYear");
              }}
            />
          </span>
        </div>

        <Button
          className="app-button"
          color="primary"
          variant="contained"
          disabled={isButtonDisabled}
          onClick={submitData}
        >
          Оплатить
        </Button>
      </Card>
    </div>
  );
};

export default App;
