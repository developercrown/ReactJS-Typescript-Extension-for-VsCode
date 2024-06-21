const cssModuleContent = (name: string) => `
.${name.toLowerCase()} {
    /* Module styles here */
}
`;

	const moduleContent = (name: string) => `
import React from 'react';
import styles from './${name}.styles.css';

/**
 * ${name} module component
 * @param {object} props - Component props
 * @returns {JSX.Element}
 */
const ${name} = (props: any): JSX.Element => {
    return <div className={styles.${name.toLowerCase()}}>{props.children}</div>;
};

export default ${name};
`;

	const testContent = (name: string) => `
import React from 'react';
import { render } from '@testing-library/react';
import ${name} from './index';

describe('${name} module', () => {
    test('renders without crashing', () => {
        const { container } = render(<${name}>Hello, World!</${name}>);
        expect(container).toBeInTheDocument();
    });
});
`;


const componentContent = (name: string) => `import React from 'react';
import PropTypes from 'prop-types';
import './${name}.css';

/**
 * ${name} properties interface
 */
interface ${name}Properties {
    children?: React.ReactNode;
}

/**
 * ${name} component
 * @param {${name}Properties} props - Component props
 * @returns {JSX.Element}
 */
const ${name} = (props: ${name}Properties): JSX.Element => {
    return <div className="${name.toLowerCase()}">{props.children}</div>;
};

${name}.propTypes = {
    children: PropTypes.node,
};

${name}.defaultProps = {
    children: null,
};

export default ${name};
`;
	const interfaceContent = (name: string) => `/** * ${name} interface
 */
export interface ${name} {
    id: string;
};
`;

	const modelContent = (name: string) => `/** * ${name} model
 */
export class ${name} {
    id: string;

    /**
     * Creates an instance of ${name}.
     * @param {string} id - The ID of the model
     */
    constructor(id: string, name: string, description?: string) {
        this.id = id;
    }
};
`;
	const hookContent = (name: string) => `import { useState, useEffect } from 'react';

/**
 * Custom hook ${name}
 * @returns {object} - The hook state and actions
 */
const use${name} = () => {
    const [state, setState] = useState(null);

    useEffect(() => {
        // Effect logic here
        return () => {
            // Cleanup logic here
        };
    }, []);

    return {
        state,
        setState,
    };
};

export default use${name};
`;

	const cssContent = (name: string) => `/* Styles for ${name} component */
.${name.toLowerCase()} {
    /* Add your styles here */
}
`;

	const viewContent = (name: string) => `import React from 'react';
import PropTypes from 'prop-types';
import './${name}.css';

/**
 * ${name} view
 * @param {object} props - View props
 * @returns {JSX.Element}
 */
const ${name} = (props) => {
    return <div className="${name.toLowerCase()}">{props.children}</div>;
};

${name}.propTypes = {
    children: PropTypes.node,
};

${name}.defaultProps = {
    children: null,
};

export default ${name};
`;

const typeContent = (name: string) => `const ${name}TypeValues = [];
type ${name}Type = typeof ${name}TypeValues[number];
export default ${name}Type;`;

export{
    cssModuleContent,
    moduleContent,
    testContent,
    componentContent,
    interfaceContent,
    modelContent,
    hookContent,
    cssContent,
    viewContent,
    typeContent
}