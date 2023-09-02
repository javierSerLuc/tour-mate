import * as React from 'react';
import {useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SelectorFecha } from '../Layout/SelectorFecha';
import { SelectorPoiInicial } from '../Layout/SelectorPoiInicial';
import { SelectorCriterios } from '../Layout/SelectorCriterios';
import persona from '../../Resources/persona.svg'
import '../CSS/Stepper.css'


const steps = ['Selecciona cuando', 'Selecciona desde donde empezar', 'Selecciona tus preferencias'];

export const PaginaPrincipal = () => {

  const navigate = useNavigate();

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    //Selectores fecha
    const [diaCalendar, setDiaCalendar] = React.useState('');
    const [horaInicioReloj, setHoraInicioReloj] = React.useState('');
    const [horaFinReloj, setHoraFinReloj] = React.useState('');
    const [poiInicialSelect, setPoiInicialSelect] = React.useState('');
    const [vehiculo, setVehiculo] = React.useState('');
    const [errorHora, setErrorHora] = React.useState(0);

    
      
     let botones = {width: 120,borderRadius: 35,bgcolor: '#5563ad',margin:4,':hover': {
      bgcolor: '#F8A41F', // theme.palette.primary.main
      color: 'white',
      
    }};

    const isStepOptional = (step) => {
        return step === 1;
    };
    
      const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);

        if(activeStep === steps.length - 1){
          navigate('/Ruta');
        }
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
          // You probably want to guard against something like this,
          // it should never occur unless someone's actively trying to break something.
          throw new Error("You can't skip a step that isn't optional.");
        }
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
          const newSkipped = new Set(prevSkipped.values());
          newSkipped.add(activeStep);
          return newSkipped;
        });
        setPoiInicialSelect('');
        sessionStorage.removeItem('poiInicial');
    };
    const handleReset = () => {
        setActiveStep(0);
    };

    const comprobarEleccionDatos = () => {
        let dia = sessionStorage.getItem('dia');
        let dateInicioRuta = sessionStorage.getItem('horaInicio');
        let dateFinRuta = sessionStorage.getItem('horaFin');
        let vehiculo = sessionStorage.getItem('vehicle');

        return dia !== null && dateInicioRuta !== null && dateFinRuta !== null && vehiculo !== null && errorHora === 0;
    };
    React.useEffect(() => {
      sessionStorage.clear();
    },[]);

    

  return (
    //div with top margin
    <div className='work-board'>
      <div className='img-board'>
        {/* <img src='../../Group.svg' alt='Persona' className='img-persona' /> */}
        <img src={persona} alt="Landing" />

      </div>

      <div className='stepper-board' >
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};


            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps} className='step'>
                <StepLabel {...labelProps} >{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        
          <React.Fragment>
              {/* Aqui va el contenido de cada paso */}
              {activeStep === 0 && <SelectorFecha diaCalendar={diaCalendar} setDiaCalendar={setDiaCalendar} horaInicioReloj={horaInicioReloj} setHoraInicioReloj={setHoraInicioReloj} horaFinReloj={horaFinReloj} setHoraFinReloj={setHoraFinReloj} setPoiInicialSelect={setPoiInicialSelect} vehiculo={vehiculo} setVehiculo={setVehiculo} setErrorHora={setErrorHora}  />}
              {activeStep === 1 && <SelectorPoiInicial poiInicialSelect={poiInicialSelect} setPoiInicialSelect={setPoiInicialSelect} />}
              {activeStep === 2 && <SelectorCriterios />}
            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
            <div className='botones'>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="contained" sx={botones}
              >
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={botones}>
                  Skip
                </Button>
              )}
              {activeStep===0 && (
                comprobarEleccionDatos() ? (
                
                  <Button onClick={handleNext} variant="contained" sx={botones}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                ) : 
                  <Button disabled onClick={handleNext} variant="contained" sx={botones} >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
              )}
              {activeStep!==0 && (

              <Button onClick={handleNext} variant="contained" sx={botones} >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
              )}
            </div>
          </React.Fragment>
      
    
      </div>
    </div>

    
    
  )
}
