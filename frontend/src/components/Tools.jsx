import CodeTool from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import InlineCode from '@editorjs/inline-code';
import LinkTool from '@editorjs/link';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Quote from '@editorjs/quote';
import RawTool from '@editorjs/raw';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import CheckList from "@editorjs/checklist";
export const EDITOR_JS_TOOLS =  {
        header: {
          class: Header,
          inlineToolbar: ['link'],
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+O',
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: "Quote's author",
          },
        },
        marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M',
        },
        code: CodeTool,
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+M',
        },
        delimiter: Delimiter,
        raw: RawTool,
        warning: {
          class: Warning,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+W',
          config: {
            titlePlaceholder: 'Title',
            messagePlaceholder: 'Message',
          },
        },
        linkTool: {
          class: LinkTool,
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
        image: {
          class: ImageTool,

        },
        checkList: {
          class: CheckList,
        },
      }
