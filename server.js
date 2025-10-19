const express = require("express");
const rateLimit = require("express-rate-limit");

const PORT = process.env.PORT || 8000;
const fetch_Cat_API_URL = "https://catfact.ninja/fact";

app = express();

//CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//Limiting each IP to 30 request in 5 minutes
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 30,
  message: {
    status: "error",
    message: "Too many reuest, please try again later",
  },
});

app.use(limiter);

const fetchCatFactData = async () => {
  const controller = new AbortController();
  const signal = controller.signal;

  //Abort after 8seconds if no response
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(fetch_Cat_API_URL, { signal });

    //clear timeoutId if request is completed within the 8s duration
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched cat data: ", data.fact);
    return data.fact;
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Request time out ", err.message);
      throw err;
    } else {
      console.log("Error fetching data: ", err.message);
      throw new Error("External API is currently unavailable.");
    }
  }
};

app.get("/me", async (req, res) => {
  try {
    const catFact = await fetchCatFactData();

    const response = {
      status: "success",
      user: {
        email: "afakiryahamman@gmail.com",
        name: "Hamman Afakirya",
        stack: "NodeJs/expressJs",
      },
      timestamp: new Date().toISOString(),
      fact: catFact,
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
});

//Handling Wrong Route
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
