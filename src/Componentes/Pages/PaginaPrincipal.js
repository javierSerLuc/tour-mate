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
          navigate('/mapa');
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

        return dia !== null && dateInicioRuta !== null && dateFinRuta !== null;
    };

    

  return (
    //div with top margin


    
    <div style={{maxWidth: '60%', margin: 'auto',marginTop: '8%'}}>
      <Stepper activeStep={activeStep}>
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
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
       
        <React.Fragment>
            {/* Aqui va el contenido de cada paso */}
            {activeStep === 0 && <SelectorFecha diaCalendar={diaCalendar} setDiaCalendar={setDiaCalendar} horaInicioReloj={horaInicioReloj} setHoraInicioReloj={setHoraInicioReloj} horaFinReloj={horaFinReloj} setHoraFinReloj={setHoraFinReloj} setPoiInicialSelect={setPoiInicialSelect}  />}
            {activeStep === 1 && <SelectorPoiInicial poiInicialSelect={poiInicialSelect} setPoiInicialSelect={setPoiInicialSelect} />}
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            {activeStep===0 && (
              comprobarEleccionDatos() ? (
              
                <Button onClick={handleNext} >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              ) : 
                <Button disabled onClick={handleNext} >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            )}
            {activeStep!==0 && (

            <Button onClick={handleNext} >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
            )}
          </Box>
        </React.Fragment>
      
    
    </div>
  )
}
