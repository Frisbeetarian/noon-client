import React, { useEffect, useMemo } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import {
  getParticlesInitialized,
  setParticlesInitialized,
} from '../../store/ui'
import { useDispatch, useSelector } from 'react-redux'

const AppParticles = () => {
  const dispatch = useDispatch()
  const particlesInitialized = useSelector(getParticlesInitialized)

  useEffect(() => {
    if (!particlesInitialized) {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine)
      }).then(() => {
        dispatch(setParticlesInitialized(true))
      })
    }
  }, [particlesInitialized])

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: '#000000',
        },
      },
      fpsLimit: 24,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onHover: {
            enable: true,
            mode: 'repulse',
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: '#921A1C',
        },
        links: {
          color: '#921A1C',
          distance: Math.floor(Math.random() * (800 - 250 + 1)) + 250,
          enable: true,
          opacity: 1,
          width: 0.5,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: true,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 1,
        },
        shape: {
          type: 'triangle',
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    []
  )

  if (particlesInitialized) {
    return (
      <Particles
        id="tsparticles"
        // @ts-ignore
        options={options}
      />
    )
  } else {
    return null
  }
}

AppParticles.displayName = 'AppParticles'
export default AppParticles
