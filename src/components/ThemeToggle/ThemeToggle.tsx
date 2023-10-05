import { getRandomUUID } from '@utils/index'
import classes from './ThemeToggle.module.scss'
import classNames from 'classnames'
import { useThemeContext } from '@/store/theme/ThemeContext'

interface IProps {
  className?: string
}

export function ThemeToggle({ className }: IProps) {
  const id = getRandomUUID()
  const { theme, toggle } = useThemeContext()

  return (
    <div className={classNames('leading-[0]', className)}>
      <input type="checkbox" id={id} className={classes.checkbox} checked={theme === 'light'} onChange={toggle} />
      <label htmlFor={id} className={classes.toggle}>
        <span className={classes.button}>
          <span className={classNames(classes.crater, classes['crater-1'])}></span>
          <span className={classNames(classes.crater, classes['crater-2'])}></span>
          <span className={classNames(classes.crater, classes['crater-3'])}></span>
          <span className={classNames(classes.crater, classes['crater-4'])}></span>
          <span className={classNames(classes.crater, classes['crater-5'])}></span>
          <span className={classNames(classes.crater, classes['crater-6'])}></span>
          <span className={classNames(classes.crater, classes['crater-7'])}></span>
        </span>
        <span className={classNames(classes.star, classes['star-1'])}></span>
        <span className={classNames(classes.star, classes['star-2'])}></span>
        <span className={classNames(classes.star, classes['star-3'])}></span>
        <span className={classNames(classes.star, classes['star-4'])}></span>
        <span className={classNames(classes.star, classes['star-5'])}></span>
        <span className={classNames(classes.star, classes['star-6'])}></span>
        <span className={classNames(classes.star, classes['star-7'])}></span>
        <span className={classNames(classes.star, classes['star-8'])}></span>
      </label>
    </div>
  )
}
