import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import data from "./../../apis/local";
import background from "../../assets/images/controlsoft/image25.webp";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
  },
  formStyles: {
    width: 600,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 150,
    marginLeft: 180,
    marginTop: 10,
    marginBottom: 10,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
}));

function AboutUsForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [params, setParams] = useState({});
  const [selectedState, setSelectedState] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get(`/cities/${props.params.id}`);
      const workingData = Object.values(response.data.data);
      let row = {};
      workingData.map((city) => {
        console.log("this is the products:", city);
        row = {
          id: city.id,
          name: city.name,
          code: city.code,
          description: city.description,
          country: city.country[0],
          state: city.state[0],
          securityStatus: city.securityStatus,
        };
      });
      setParams(row);
      setSelectedCountry(row.country);
      setSelectedState(row.state);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/countries");
      const workingData = response.data.data.data;
      workingData.map((country) => {
        allData.push({ id: country._id, name: country.name });
      });
      setCountryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      data.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await data.get("/states", {
        params: { country: selectedCountry },
      });
      const workingData = response.data.data.data;
      workingData.map((state) => {
        allData.push({ id: state._id, name: state.name });
      });
      setStateList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [selectedCountry]);

  const handleSelectedStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleSelectedCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setStateList([]);
  };

  return (
    <div className={classes.background}>
      {/* <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "blue", fontSize: "1.5em" }}
          component="legend"
        >
          About Us
        </FormLabel>
      </Grid> */}
      <Box
        // onSubmit={onSubmit}
        sx={{
          width: 800,
          height: 450,
        }}
        noValidate
        autoComplete="off"
        // style={{ marginTop: 20 }}
        // className={classes.background}
        style={{ height: "35em", marginTop: "-300" }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          //   style={{ height: "20em" }}
          //   className={classes.background}
        >
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            // className={classes.background}
            // style={{ height: "25em", width: "50%", marginTop: "-300" }}
          >
            <Typography
              //variant="h4"
              style={{
                marginTop: 50,
                marginLeft: 100,
                color: "aqua",
                fontSize: 16,
              }}
            >
              <strong>
              At TopCreators, we believe that powerful storytelling is at the heart of every successful brand.
              Our platform is designed to connect businesses with top-tier creators specializing in marketing videos and jingles 
              that captivate audiences and leave a lasting impression
                <br />
              </strong>
            </Typography>
            <br />
            <Typography
              //variant="h4"
              style={{
                marginTop: 20,
                marginLeft: 100,
                color: "aqua",
                fontSize: 16,
              }}
            >
              {/* <strong> */}
              We bring together talented video producers, animators, voice-over artists, and musicians who are passionate about
              helping brands stand out in today’s competitive market. Whether you need an engaging ad, a product explainer, 
              or a catchy jingle to reinforce your brand identity, our curated network of professionals is here to bring your 
              vision to life.

              {/* </strong> */}
            </Typography>
            <Typography
              //variant="h4"
              style={{
                marginTop: 20,
                marginLeft: 100,
                color: "aqua",
                fontSize: 16,
              }}
            >
              {/* <strong> */}
              Our mission is simple: to make high-quality creative production accessible, seamless, and results-driven. With an intuitive platform, transparent collaboration, and a commitment to excellence, we empower brands to produce marketing content that resonates, 
              inspires, and drives growth
              {/* </strong> */}
            </Typography>
            <Typography
              //variant="h4"
              style={{
                marginTop: 20,
                marginLeft: 100,
                color: "aqua",
                fontSize: 16,
              }}
            >
              {/* <strong> */}
              Join us and discover how the right creative partnership can take your brand to new heights!
              {/* </strong> */}
            </Typography>
          </Grid>
          {/* <Grid item style={{ width: "50%" }}>
            <Typography>This is where content will stay</Typography>
          </Grid> */}
        </Grid>
      </Box>
      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "cityForm",
})(AboutUsForm);
