import {
  colorsTuple,
  createTheme,
  DEFAULT_THEME,
  Divider,
  MantineProvider,
  virtualColor,
  type CSSVariablesResolver,
  type MantineProviderProps,
} from "@mantine/core";
import Header from "components/Header";
import bgVideo from "../assets/bg.mp4";

// Override the --mantine-color-text variable globally
const resolver: CSSVariablesResolver = () => ({
  variables: {
    '--mantine-color-default-border': '#444',
    '--mantine-color-brandPersimmon': '#ff6f46'
  },
  light: {
    '--mantine-color-text': '#eee', // Set your default light mode font color
    '--mantine-border-color': '#444',
    '--mantine-color-brandPersimmon': '#ff6f46'
  },
  dark: {
    '--mantine-color-text': '#eee', // Set your default dark mode font color
    '--mantine-border-color': '#444',
    '--mantine-color-brandPersimmon': '#ff6f46'
  },
});
export const appTheme = createTheme({
  fontFamily: `"Barlow Condensed", sans-serif`,
  colors: {
    brandSalmon: colorsTuple('#f9896c'),
    brandSalmonDark: colorsTuple('#ff816e'),
    brandPersimmon: colorsTuple('#ff6f46'),
    brandPizzazz: colorsTuple('#ff8c00'),
    brandStarship: colorsTuple('#f0f350'),
    brandWattle: colorsTuple('#DEDE58'),
    brandCerulean: colorsTuple('#0E8DBF'),
    brandBlueMarguerite: colorsTuple('#696EBF'),
    brandSilverTree: colorsTuple('#53BB96'),
    brandPomegranate: colorsTuple('#F13C27'),
    
  },
  headings: {
    fontWeight: '700',
    fontFamily: `"Special Gothic", sans-serif;`,
  },
  fontWeights: {
    regular: '700', // Overrides default 400 with 500
  },
  fontSizes: {
    xl: '1.75rem', 
    lg: '2rem', 
    md: '1.25rem', 
    sm: '0.875rem', 
  },
  components: {
    Divider: Divider.extend({
      styles: {
        root: {
          marginTop: 2,
          marginBottom: 2,
          width: '100%',
          borderTop: `transparent`,
          height: 2,
          background: `linear-gradient(90deg, #ff816e, #ff6f46, #ff816e)`,
        }
      }
    }),
  } 
})

export function AppTheme({ children, theme = appTheme, ...props }: MantineProviderProps) {
  return <MantineProvider theme={theme} {...props} cssVariablesResolver={resolver}>
    <div style={{ width: '100%', height: '100%', position: 'relative' }} >
      <video autoPlay muted loop style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <Header /> 
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  </MantineProvider>
}
