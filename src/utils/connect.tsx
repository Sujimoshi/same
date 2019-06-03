// import { StoreState } from "./types";
import * as React from "react";
import {
  connect as originalConnect,
  MapDispatchToPropsParam,
  MapStateToPropsParam,
  MergeProps,
  Options
} from "react-redux";

export type InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> = <
  TComponent extends React.ComponentType<TInjectedProps & TNeedsProps>
>(
  component: TComponent
) => TComponent;

interface MyConnect {
  <TStoreState = {}, TStateProps = {}, TDispatchProps = {}, TOwnProps = {}>(
    mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, TStoreState>,
    mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
  ): InferableComponentEnhancerWithProps<
    TStateProps & TDispatchProps,
    TOwnProps
  >;

  <
    TStoreState = {},
    TStateProps = {},
    TDispatchProps = {},
    TOwnProps = {},
    TMergedProps = {}
  >(
    mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, TStoreState>,
    mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    mergeProps?: MergeProps<
      TStateProps,
      TDispatchProps,
      TOwnProps,
      TMergedProps
    >,
    options?: Options<TStateProps, TOwnProps, TMergedProps>
  ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>;
}

export const withConnect = originalConnect as MyConnect;
