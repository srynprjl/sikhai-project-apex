import React, { memo, useEffect, useRef} from 'react'
import EditorJS from '@editorjs/editorjs'
import { EDITOR_JS_TOOLS } from './Tools'

const Editor = ({data, onChange, editorBlock}) => {
    const ref = useRef()

    useEffect(() => {
        if (!ref.current) {
            const editor = new EditorJS({
                holder: editorBlock,
                data: data,
                tools: EDITOR_JS_TOOLS,
                async onChange(api, event) {
                    const data = await api.saver.save()
                    onChange(data)
                }
            })
            ref.current = editor
        }

        return () => {
            if(ref.current && ref.current.destroy) {
                ref.current.destroy()
            }
        }
    }, [])

    return <div id={editorBlock} className='prose' />
}


export default memo(Editor)