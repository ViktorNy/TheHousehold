import React from 'react';
import { PieChartData } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';

interface PieSlices {
    slices: {
        data: PieChartData
        endAngle: number
        index: number
        labelCentroid: number[]
        padAngle: number
        pieCentroid: number[]
        startAngle: number
        value: number
    }[]
}

export default function PieChartLabel({ slices }: PieSlices) {
    return slices.map((slice, index) => {
        const { pieCentroid, data } = slice;
        return (
            <Text
                key={index}
                x={pieCentroid[0]}
                y={pieCentroid[1]}
                textAnchor={'middle'}
                alignmentBaseline={'middle'}
                fontSize={24}
            >
                {data.key}
            </Text>
        );
    });
}