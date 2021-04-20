import React, { useCallback, useState } from 'react'
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import * as S from './styles'

import Button from '../../components/Button'

export function UserIdentification (){
    const [isFocused, setIsFocused] = useState(false)

    const [isFilled, setIsFilled] = useState(false)

    const [name, setName] = useState('')

    const handleInputChange = useCallback((value: string)=>{
        setIsFilled(!!value)
        setName(value)
    },[])

    const { navigate } = useNavigation()

    const handleNavigate = useCallback(()=>{
        navigate('Confirmation')
    },[])

    return(
        <S.Container>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <S.Content
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <S.Form>
                            <S.Emoji>{!isFilled && '🙂'}{isFilled && '😄'}</S.Emoji>
                            <S.Text>
                                Como podemos {'\n'}
                                chamar você?
                            </S.Text>
                            <S.Input 
                                autoCapitalize="words"
                                returnKeyType="send"
                                onSubmitEditing={handleNavigate}

                                isFilled={isFilled}
                                isFocused={isFocused} 
                                placeholder="Digite seu nome"
                                onFocus={()=>setIsFocused(true)}
                                onBlur={()=>setIsFocused(false)}
                                onChangeText={handleInputChange}
                            />
                            <Button 
                                disabled={name === ''}
                                onPress={handleNavigate}
                            >
                                Confirmar
                            </Button>
                        </S.Form>
                    </S.Content>
                </TouchableWithoutFeedback>
        </S.Container>
    )
}