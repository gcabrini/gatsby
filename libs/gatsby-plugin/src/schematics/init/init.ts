import { chain, noop, Rule } from '@angular-devkit/schematics';
import {
  addDepsToPackageJson,
  addPackageWithInit,
  updateJsonInTree,
  updateWorkspace
} from '@nrwl/workspace';
import { Schema } from './schema';
import {
  gatsbyImageVersion,
  gatsbyPluginManifestVersion,
  gatsbyPluginOfflineVersion,
  gatsbyPluginReactHelmetVersion,
  gatsbyPluginSharpVersion, gatsbySourceFilesystemVersion, gatsbyTransformerSharpVersion,
  gatsbyVersion,
  nxVersion, prettierVersion, propTypesVersion,
  reactDomVersion, reactHelmetVersion,
  reactVersion

} from '../../utils/versions';
import { JsonObject } from '@angular-devkit/core';
import { setDefaultCollection } from '@nrwl/workspace/src/utils/rules/workspace';

function jsonIdentity(x: any): JsonObject {
  return x as JsonObject;
}

function setDefault(): Rule {
  const updateProjectWorkspace = updateWorkspace(workspace => {
    workspace.extensions.schematics =
      jsonIdentity(workspace.extensions.schematics) || {};

    const gatsbySchematics =
      jsonIdentity(workspace.extensions.schematics['@nrwl/gatsby']) || {};

    workspace.extensions.schematics = {
      ...workspace.extensions.schematics,
      '@nrwl/gatsby': {
        application: {
          ...jsonIdentity(gatsbySchematics.application)
        }
      }
    };
  });
  return chain([setDefaultCollection('@nrwl/gatsby'), updateProjectWorkspace]);
}

export default function(schema: Schema) {
  return chain([
    setDefault(),
    addDepsToPackageJson(
      {
        'gatsby': gatsbyVersion,
        'gatsby-image': gatsbyImageVersion,
        'gatsby-plugin-manifest': gatsbyPluginManifestVersion,
        'gatsby-plugin-offline': gatsbyPluginOfflineVersion,
        'gatsby-plugin-react-helmet': gatsbyPluginReactHelmetVersion,
        'gatsby-plugin-sharp': gatsbyPluginSharpVersion,
        'gatsby-source-filesystem': gatsbySourceFilesystemVersion,
        'gatsby-transformer-sharp': gatsbyTransformerSharpVersion,
        'prop-types': propTypesVersion,
        'react': reactVersion,
        'react-dom': reactDomVersion,
        'react-helmet': reactHelmetVersion
      },
      {
        // '@nrwl/gatsby': nxVersion,
        'prettier': prettierVersion
      }
    )
  ]);
}