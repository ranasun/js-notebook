export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export const downloadJSON = (filename: string, data: object) => {
  const blob = new Blob([JSON.stringify(data)], { type: 'text/json' });
  const link = document.createElement('a');

  link.download = filename;
  link.href = window.URL.createObjectURL(blob);
  link.dataset.downloadurl = ['text/json', link.download, link.href].join(':');

  const evt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  link.dispatchEvent(evt);
  link.remove();
};
