import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, GaugeChart, LineChart, PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { appRoutes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
echarts.use([LineChart, BarChart, PieChart, GaugeChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent, CanvasRenderer]);
export const appConfig = {
    providers: [
        provideRouter(appRoutes),
        provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
        provideNativeDateAdapter(),
        provideEchartsCore({ echarts }),
        importProvidersFrom(MatSnackBarModule),
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' }
        }
    ]
};
//# sourceMappingURL=app.config.js.map