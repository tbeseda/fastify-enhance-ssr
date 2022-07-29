export default function (state) {
  const { user } = state;
  return /*html*/ `
<hello-you></hello-you>
<hello-you name="World" color="DodgerBlue" uid="a2"></hello-you>
<hello-you name="${user.name}" color="Crimson" uid="a3"></hello-you>
`;
}
