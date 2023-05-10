import { FC } from 'react'
import ReduxToastr from 'react-redux-toastr'

const ReduxToast: FC = () => {
  return (
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      preventDuplicates
      progressBar
      closeOnToastrClick
    />
  )
}
export default ReduxToast
