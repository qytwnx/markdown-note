import { useState } from 'react';
import { MdEditor } from 'md-editor-rt';
import { Emoji, Mark, ExportPDF } from '@vavt/rt-extension';
import TimeNow from '@renderer/components/utils/time-now';
// import './index.less';
import { useAppStore } from '@renderer/store';
import 'md-editor-rt/lib/style.css';
import '@vavt/rt-extension/lib/asset/style.css';

const MarkdownEditor = () => {
  const [text, setText] = useState('hello md-editor-rt！');
  const isDark = useAppStore((state) => state.isDark);

  return (
    <>
      <MdEditor
        theme={isDark ? 'dark' : 'light'}
        language="en-US"
        previewTheme={'vuepress'}
        modelValue={text}
        autoDetectCode
        noIconfont={true}
        defToolbars={[
          <Mark key="mark-extension" />,
          <Emoji key="emoji-extension" />,
          <ExportPDF key="ExportPDF" modelValue={text} height="700px" />
        ]}
        onSave={(v, h) => {
          console.log('v', v);

          h.then((html) => {
            console.log('h', html);
          });
        }}
        toolbars={[
          'bold',
          'underline',
          'italic',
          'strikeThrough',
          '-',
          'title',
          'sub',
          'sup',
          'quote',
          'unorderedList',
          'orderedList',
          'task',
          '-',
          'codeRow',
          'code',
          'link',
          'table',
          'mermaid',
          'katex',
          0,
          1,
          2,
          3,
          '-',
          'revoke',
          'next',
          'save',
          '=',
          'prettier',
          'preview',
          'previewOnly',
          'htmlPreview',
          'catalog'
        ]}
        onChange={(value: string) => setText(value)}
        footers={['markdownTotal', '=', 0, 'scrollSwitch']}
        defFooters={[<TimeNow key="time-now" />]}
      />
    </>
  );
};

export default MarkdownEditor;
