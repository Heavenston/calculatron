import styled from "styled-components";

interface Props {
  secondary?: boolean;
}

export default styled.button<Props>`
outline: none;
border: none;
border-radius: ${props => props.theme.borderRadius};
background-color: ${props => 
  props.secondary ? props.theme.colors.background2 : props.theme.colors.background3
};
color: inherit;

cursor: pointer;

font: inherit;

border: 0px solid ${props => props.theme.colors.background2};
transition: border 0.125s, border-radius 0.125s, background-color 0.125s;

&:hover {
  background-color: ${props => 
    props.secondary ? props.theme.colors.background3 : props.theme.colors.background2
  };
}
&:active {
  border: 5px solid ${props => 
    props.secondary ? props.theme.colors.background2 : props.theme.colors.background3
  };
  border-radius: 0;
}
`;