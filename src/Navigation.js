import { Routes, Route } from 'react-router-dom'
import {
    LoginScreen,
    RegisterScreen,
    DashboardScreen,
    CreateProductScreen,
    ListProductScreen
} from './components'


function Navigation() {
    const allComponents = [
        {
            id: 1,
            path: '/',
            components: <LoginScreen />,
        },
        {
            id: 2,
            path: '/register',
            components: <RegisterScreen />,
        },
        {
            id: 3,
            path: '/dashboard',
            components: <DashboardScreen />,
        },
        {
            id: 4,
            path: '/create',
            components: <CreateProductScreen />,
        },
        {
            id: 5,
            path: '/listproduct',
            components: <ListProductScreen />,
        },
    ]
    return (
        <>
            <Routes>
                {allComponents.map((component) => {
                    return (
                        <Route
                            path={component.path}
                            element={component.components}
                            key={component.id}
                        />
                    )
                })}
            </Routes>
        </>
    )
}

export default Navigation