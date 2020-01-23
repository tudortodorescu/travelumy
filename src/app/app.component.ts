import { Component, ViewChild, ChangeDetectorRef, ViewContainerRef, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { Subscription } from "rxjs";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { UIService } from "./shared/ui/ui.service";
import { AuthService } from "./auth/auth.service";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('drawer', { static: false }) drawerComponent: RadSideDrawerComponent;
    private drawerSub: Subscription;
    private drawer: RadSideDrawer;

    constructor(
        private uiService: UIService,
        private changeDetectionRef: ChangeDetectorRef,
        private vcRef: ViewContainerRef,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.drawerSub = this.uiService.drawerState.subscribe(() => {
            if (this.drawer) {
                this.drawer.toggleDrawerState();
            }
        });
        this.uiService.setRootVCRef(this.vcRef);
    }

    ngOnDestroy() {
        if (this.drawerSub) {
            this.drawerSub.unsubscribe();
        }
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectionRef.detectChanges();
    }

    onLogout() {
        this.uiService.toggleDrawer();
        // to be implemented
        // this.authService.logout();
    }
}
