import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { sortBy } from 'lodash'
import { ResponsiveBar } from '@nivo/bar'
import { navigate } from 'gatsby'
import theme from '../../nivoTheme'
import PeriodicTableElementSvg from '../elements/PeriodicTableElementSvg'

export default class SectionOpinionsChart extends Component {
    static propTypes = {
        section: PropTypes.string.isRequired,
        opinions: PropTypes.arrayOf(
            PropTypes.shape({
                survey_id: PropTypes.string.isRequired
            })
        ).isRequired
    }

    render() {
        const { section, opinions } = this.props
        const surveyData = opinions.find(o => o.survey_id === '2018')

        if (surveyData === undefined) {
            return (
                <div style={{ color: 'red' }}>
                    No data found found for survey: <strong>2018</strong>
                    <br />
                    <br />
                </div>
            )
        }

        const sortedData = sortBy(surveyData.tools, 'would_use')

        return (
            <div style={{ height: 360 }}>
                <ResponsiveBar
                    margin={{
                        top: 81,
                        bottom: 30
                    }}
                    keys={[
                        'would_use',
                        'would_not_use',
                        'interested',
                        'not_interested',
                        'never_heard'
                    ]}
                    indexBy="tool_id"
                    data={sortedData}
                    theme={theme}
                    colors={theme.opinionColors}
                    labelFormat=".2s"
                    labelTextColor="inherit:darker(1.6)"
                    labelSkipWidth={32}
                    labelSkipHeight={20}
                    padding={0.6}
                    axisLeft={null}
                    axisTop={{
                        renderTick: tick => {
                            return (
                                <g
                                    key={tick.key}
                                    transform={`translate(${tick.x - 30},${tick.y - 80})`}
                                >
                                    <PeriodicTableElementSvg
                                        section={section}
                                        tool={tick.value}
                                        size={60}
                                        onClick={() => {
                                            navigate(`${section}/${tick.value}`)
                                        }}
                                    />
                                </g>
                            )
                        }
                    }}
                    axisBottom={{
                        tickSize: 0,
                        tickPadding: 10,
                        renderTick: tick => {
                            return (
                                <g
                                    key={tick.key}
                                    transform={`translate(${tick.x},${tick.y + 14})`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        navigate(`${section}/${tick.value}`)
                                    }}
                                >
                                    <text
                                        fill="rgb(254, 106, 106)"
                                        textAnchor="middle"
                                        alignmentBaseline="hanging"
                                        style={{ fontSize: '13px' }}
                                    >
                                        {tick.value}
                                    </text>
                                </g>
                            )
                        }
                    }}
                />
            </div>
        )
    }
}