import { FC, useMemo } from 'react';
import { CSSProperties } from 'styled-components';
import { Base, BaseProps } from './Base';
import { GridContextProvider } from './GridContext';
import { SpacingType } from './types';

export interface GridProps extends BaseProps<HTMLDivElement>
{
    inline?: boolean;
    gap?: SpacingType;
    maxContent?: boolean;
    columnCount?: number;
}

export const Grid: FC<GridProps> = props =>
{
    const { inline = false, gap = 2, maxContent = false, columnCount = 0, fullHeight = true, classNames = [], style = {}, ...rest } = props;

    const getClassNames = useMemo(() =>
    {
        const newClassNames: string[] = [];

        if(inline) newClassNames.push('inline-grid');
        else newClassNames.push('grid');

        if(gap) newClassNames.push('gap-' + gap);
        else if(gap === 0) newClassNames.push('gap-0');

        if(classNames.length) newClassNames.push(...classNames);

        return newClassNames;
    }, [ inline, gap, classNames ]);

    const getStyle = useMemo(() =>
    {
        let newStyle: CSSProperties = {};

        if(columnCount) newStyle['--bs-columns'] = columnCount.toString();

        if(maxContent) newStyle.gridTemplateRows = 'max-content';

        if(Object.keys(style).length) newStyle = { ...newStyle, ...style };

        return newStyle;
    }, [ columnCount, maxContent, style ]);

    return (
        <GridContextProvider value={ { isCssGrid: true } }>
            <Base fullHeight={ fullHeight } classNames={ getClassNames } style={ getStyle } { ...rest } />
        </GridContextProvider>
    );
}
