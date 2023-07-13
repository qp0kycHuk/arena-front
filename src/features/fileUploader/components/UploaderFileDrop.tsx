import React, { DragEvent } from 'react'
import { PlusIcon } from '@assets/icons/stroke'
import { FileDrop } from 'react-file-drop'

interface IUploaderFileDropProps {
  uploader: IUplodaer
}

export function UploaderFileDrop({ uploader }: IUploaderFileDropProps) {
  function dropHandler(files: FileList | null, event: DragEvent<HTMLDivElement>) {
    uploader.addItems(Array.from(files || []))
  }

  return (
    <FileDrop
      className="absolute -inset-4"
      targetClassName="filedrop-target"
      draggingOverFrameClassName="over-frame"
      draggingOverTargetClassName="over-target"
      onDrop={dropHandler}
    >
      <PlusIcon className="m-auto text-4xl text-primary" />
    </FileDrop>
  )
}
