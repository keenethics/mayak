'use client';
import StyledComponentsRegistry from '../lib/registry'
import { ThemeProvider as Provider } from 'styled-components';
import theme from './styles/theme';

const ThemeProvider = (props) => {
    return (
        <StyledComponentsRegistry>
            <Provider theme={theme}>
                {props.children}
            </Provider>
        </StyledComponentsRegistry>
    );
};

export default ThemeProvider