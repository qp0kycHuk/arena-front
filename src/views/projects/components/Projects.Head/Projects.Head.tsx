import { Name } from './Projects.Head.Name'
import { HeadMenu } from './Projects.Head.Menu'
import { FolderSettings } from './Projects.Head.FolderSettings'

export function Head() {
  return (
    <div className="flex items-center mb-8">
      <Name />
      <div className="flex ml-auto">
        <FolderSettings />
        <HeadMenu />
      </div>
    </div>
  )
}
