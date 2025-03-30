import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      primary: '#2c3638',    // Dark slate gray
      secondary: '#c1c4b1',  // Light sage gray
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'brand.primary' : 'brand.secondary',
        color: props.colorMode === 'dark' ? 'brand.secondary' : 'brand.primary',
      },
    }),
  },
  components: {
    Card: {
      baseStyle: (props) => ({
        container: {
          bg: props.colorMode === 'dark' ? '#363f41' : 'white',  // Slightly lighter than primary for dark mode
          boxShadow: 'sm',
        },
      }),
    },
    Button: {
      variants: {
        solid: (props) => ({
          bg: props.colorMode === 'dark' ? 'brand.secondary' : 'brand.primary',
          color: props.colorMode === 'dark' ? 'brand.primary' : 'brand.secondary',
          _hover: {
            bg: props.colorMode === 'dark' ? '#b1b4a1' : '#363f41',
            opacity: 0.9,
          },
        }),
        ghost: (props) => ({
          color: props.colorMode === 'dark' ? 'brand.secondary' : 'brand.primary',
          _hover: {
            bg: props.colorMode === 'dark' ? 'rgba(193, 196, 177, 0.1)' : 'rgba(44, 54, 56, 0.1)',
          },
        }),
      },
    },
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          bg: props.colorMode === 'dark' ? '#363f41' : 'white',
          color: props.colorMode === 'dark' ? 'brand.secondary' : 'brand.primary',
        },
        overlay: {
          bg: 'rgba(0, 0, 0, 0.7)',
        },
      }),
    },
    Input: {
      variants: {
        outline: (props) => ({
          field: {
            bg: props.colorMode === 'dark' ? '#363f41' : 'white',
            borderColor: props.colorMode === 'dark' ? 'brand.secondary' : 'brand.primary',
            color: props.colorMode === 'dark' ? 'brand.secondary' : 'brand.primary',
            _hover: {
              borderColor: props.colorMode === 'dark' ? 'brand.secondary' : 'brand.primary',
            },
            _focus: {
              borderColor: props.colorMode === 'dark' ? 'brand.secondary' : 'brand.primary',
              boxShadow: `0 0 0 1px ${props.colorMode === 'dark' ? '#c1c4b1' : '#2c3638'}`,
            },
          },
        }),
      },
    },
    Textarea: {
      variants: {
        outline: (props) => ({
          bg: props.colorMode === 'dark' ? '#363f41' : 'white',
          borderColor: props.colorMode === 'dark' ? 'brand.secondary' : 'brand.primary',
          color: props.colorMode === 'dark' ? 'brand.secondary' : 'brand.primary',
          _hover: {
            borderColor: props.colorMode === 'dark' ? 'brand.secondary' : 'brand.primary',
          },
          _focus: {
            borderColor: props.colorMode === 'dark' ? 'brand.secondary' : 'brand.primary',
            boxShadow: `0 0 0 1px ${props.colorMode === 'dark' ? '#c1c4b1' : '#2c3638'}`,
          },
        }),
      },
    },
    Select: {
      variants: {
        outline: (props) => ({
          field: {
            bg: props.colorMode === 'dark' ? '#363f41' : 'white',
            borderColor: props.colorMode === 'dark' ? 'brand.secondary' : 'brand.primary',
            color: props.colorMode === 'dark' ? 'brand.secondary' : 'brand.primary',
            _hover: {
              borderColor: props.colorMode === 'dark' ? 'brand.secondary' : 'brand.primary',
            },
            _focus: {
              borderColor: props.colorMode === 'dark' ? 'brand.secondary' : 'brand.primary',
              boxShadow: `0 0 0 1px ${props.colorMode === 'dark' ? '#c1c4b1' : '#2c3638'}`,
            },
          },
        }),
      },
    },
  },
});

export default theme; 