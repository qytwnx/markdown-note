import { useEffect, useState } from 'react';
import { MdEditor, config } from 'md-editor-rt';
import TimeNow from '@renderer/components/utils/time-now';
import { useAppStore } from '@renderer/store';
import 'md-editor-rt/lib/style.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import mermaid from 'mermaid';
import highlight from 'highlight.js';
import screenfull from 'screenfull';
import './iconfont.js';
import 'highlight.js/styles/atom-one-dark.min.css';
import 'highlight.js/styles/atom-one-light.min.css';
import './index.less';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSave: (value: string) => void;
}

config({
  editorExtensions: {
    highlight: {
      instance: highlight,
      css: {
        atom: {
          dark: 'highlight.js/styles/atom-one-dark.min.css',
          light: 'highlight.js/styles/atom-one-light.min.css'
        }
      }
    },
    katex: {
      instance: katex
    },
    mermaid: {
      instance: mermaid
    },
    screenfull: {
      instance: screenfull
    }
  }
});

const MarkdownEditor = ({ value, onChange, onSave }: Props) => {
  const [text, setText] = useState('');
  const isDark = useAppStore((state) => state.isDark);

  const links = document.querySelectorAll('a[href]');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      const url = link.getAttribute('href');
      if (url) {
        window.api.openExternal(url);
      }
    });
  });

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <>
      <MdEditor
        placeholder="Please enter markdown content"
        theme={isDark ? 'dark' : 'light'}
        language="en-US"
        className="markdown-editor-container"
        previewTheme={'vuepress'}
        codeTheme="atom-one-dark"
        modelValue={text}
        autoDetectCode
        noIconfont
        noUploadImg
        noImgZoomIn
        noPrettier
        onSave={(value: string) => {
          onSave(value);
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
          '-',
          'revoke',
          'next',
          'save',
          '=',
          'preview',
          'previewOnly',
          'htmlPreview',
          'catalog'
        ]}
        onChange={(value: string) => onChange(value)}
        footers={['markdownTotal', '=', 0, 'scrollSwitch']}
        defFooters={[<TimeNow key="time-now" />]}
      />
    </>
  );
};

export default MarkdownEditor;
