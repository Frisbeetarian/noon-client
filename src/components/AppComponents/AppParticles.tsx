import React, { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { setParticlesInitialized } from '../../store/ui'
import { useDispatch } from 'react-redux'

const AppParticles = () => {
  const dispatch = useDispatch()
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = () => {
    dispatch(setParticlesInitialized(true))
  }

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
          distance: 500,
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

  if (init) {
    return (
      <Particles
        id="tsparticles"
        // @ts-ignore
        particlesLoaded={particlesLoaded}
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
