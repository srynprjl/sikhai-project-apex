import { memo, useEffect, useRef} from 'react'
import EditorJS from '@editorjs/editorjs'
import { EDITOR_JS_TOOLS } from './Tools'

const Editor = ({data, onChange, editorBlock, isPublic, initialBlockLimit, hasPaid}) => {
    const ref = useRef()

    useEffect(() => {
        if (!ref.current) {
            let initialData = data;
            if(!hasPaid){
                if (initialBlockLimit && data && Array.isArray(data.blocks)) {
                // If initialBlockLimit is provided and valid,
                // create new data object with a sliced blocks array
                initialData = {
                    ...data,
                    blocks: data.blocks.slice(0, initialBlockLimit)
                };
            }
            }
            const editor = new EditorJS({
                holder: editorBlock,
                data: initialData,
                tools: EDITOR_JS_TOOLS,
                async onChange(api, event) {
                    const data = await api.saver.save()
                    onChange(data)
                },
                readOnly: (isPublic ? true : false)
            })
            ref.current = editor
        }

        return () => {
            if(ref.current && ref.current.destroy) {
                ref.current.destroy()
            }
        }
    }, [])

    return <div id={editorBlock} className='prose prose-invert text-white p-0 w-dvw'  />
    
}


export default memo(Editor)
