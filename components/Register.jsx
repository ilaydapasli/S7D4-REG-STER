import axios from "axios";
import { useEffect, useState } from "react";
import {Form , FormGroup , Input, Label ,Button, Card, CardBody, CardHeader, FormFeedback, CardGroup, CardFooter} from "reactstrap"
const initialValues ={
    ad:"",
    soyad:"",
    email:"",
    password: "",
}
export const errorMessages ={
    ad:"En az 3 karakter giriniz",
    soyad:"En az 3 karakter giriniz",
    email:"Geçerli bir e mail adresi giriniz",
    password: "Password input throws error for 1234",
}

export default function Register(){
const [formdata,setFormData]=useState(initialValues);
const [errors,setErrors]=useState({
    ad:false,
    soyad:false,
    email:false,
    password: false,
})
const [isvalid,setIsvalid]=useState(false);
const [id,setId] =useState("")

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  

    useEffect(()=>{
        if(formdata.ad.trim().length >=3 &&
        formdata.soyad.trim().length >=3 &&
        validateEmail(formdata.email) && regex.test(formdata.password)
    ){
setIsvalid(true)
        }else{
            setIsvalid(false)
        }

    }, [formdata])
const handleChange=(event) =>{
    const {name,value}=event.target;
    setFormData({...formdata,[name]:value})

    if(name=="ad"||name=="soyad"){
        if(value.trim().length>= 3){
            setErrors({...errors,[name]:false})
        }else{
            setErrors({...errors,[name]:true})
        }
    }
    if(name=="email"){
          if(validateEmail(value)){
            setErrors({...errors,[name]:false})
          }  else{
            setErrors({...errors,[name]:true})
          }
    }if(name=="password"){
            if(regex.test(value)){
                setErrors({...errors,[name]:false})
            }else{
                setErrors({...errors,[name]:true})
            }
    }
    
}
const handleSubmit=(event)=>{
    event.preventDefault();
    if(!isvalid) return;
    axios.post("https://reqres.in/api/users",formdata).then(response=>{
        setId(response.data.id)
        
        setFormData(initialValues)
    }).catch(error => console.warn(error))

}


    return (
        <Card>
            <CardHeader>
                Kayıt Ol
            </CardHeader>
            <CardBody>
        <Form onSubmit={handleSubmit}>
  <FormGroup>
    <Label for="exampleEmail">
      Ad:
    </Label>
    <Input
      id="ad"
      name="ad"
      placeholder="Adınızı Giriniz"
      type="text"
      onChange={handleChange}
      value={formdata.ad}
      invalid={errors.ad}
      data-cy="ad-input"
    />
    {errors.ad &&   <FormFeedback data-cy="error-message">
      {errorMessages.ad}
    </FormFeedback>}
     
  </FormGroup>

  <FormGroup>
    <Label for="soyad">
      Soyad:
    </Label>
    <Input
      id="soyad"
      name="soyad"
      placeholder="Soyadınızı Giriniz"
      type="text"
      onChange={handleChange}
      value={formdata.soyad}
      invalid={errors.soyad}
      data-cy="soyad-input"
    />
    {errors.soyad &&   <FormFeedback data-cy="error-message">
        {errorMessages.soyad}</FormFeedback>}
  </FormGroup>
  <FormGroup>
    <Label for="email">
      Email:
    </Label>
    <Input
      id="email"
      name="email"
      placeholder="Email Giriniz"
      type="email"
      onChange={handleChange}
      value={formdata.email}
      invalid={errors.email}
      data-cy="email-input"
    />
     {errors.email &&   <FormFeedback data-cy="error-message">
        {errorMessages.email}</FormFeedback>}
  </FormGroup>

  <FormGroup>
    <Label for="password">
      Password
    </Label>
    <Input
      id="password"
      name="password"
      placeholder="Güçlü bir password seçiniz"
      type="password"
      onChange={handleChange}
      value={formdata.password}
      invalid={errors.password}
      data-cy="password-input"
    />
     {errors.password &&   <FormFeedback data-cy="error-message">
        {errorMessages.password}</FormFeedback>}
  </FormGroup>

  <Button disabled={!isvalid} data-cy="submit-button">
    Kayıt Ol
  </Button>
</Form>
</CardBody>

{id && <CardFooter data-cy="response-message">ID:{id}</CardFooter>}
        </Card>
    );
}