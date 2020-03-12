import React from 'react'
import { Button } from 'antd'

export const CustomButton = (props) => {
    return (
    <Button type={props.type} onClick={() => props.click()} loading={props.loading}>{props.buttonText}</Button>
    )
}