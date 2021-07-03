import classes from "./HeaderSection.module.css";
function HeaderSection() {
  return (
    <div className={classes.header}>
      <h1 className={classes.h1}>WELCOME TO ANSIO SOLUTIONS</h1>
      <p className={classes.h2}>Please Fill this form to Create an Account</p>
    </div>
  );
}

export default HeaderSection;
