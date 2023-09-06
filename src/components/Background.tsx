import Particles from 'react-tsparticles'

export default function Background() {
  return (
    <Particles
      options={{
        background: {
          image: '-webkit-radial-gradient(bottom, #0c0c0c, #000000)',
        },
        fullScreen: {
          zIndex: -1,
        },
        particles: {
          color: {
            value: '#fff',
          },
          move: {
            attract: {
              rotate: {
                x: 600,
                y: 600,
              },
            },
            enable: true,
            outModes: { default: 'out' },
            random: true,
            speed: 1,
          },
          number: {
            density: {
              enable: true,
            },
            value: 20,
          },
          opacity: {
            random: true,
            value: {
              min: 0,
              max: 1,
            },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0,
            },
          },
          size: {
            random: true,
            value: {
              min: 1,
              max: 1,
            },
            animation: {
              enable: true,
              speed: 4,
              minimumValue: 0,
              startValue: 'min',
            },
          },
        },
      }}
    />
  )
}
