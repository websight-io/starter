/*
 * Copyright (C) 2022 Dynamic Solutions
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package pl.ds.luna.services.impl;

import org.osgi.service.component.annotations.Component;
import pl.ds.luna.services.AuthRequirementsService;

/**
 * OSGi service to extend the configuration of sling.auth.requirements property.
 * Used by the feature configuration file.
 */
@Component(immediate = true)
public class AuthRequirementsServiceImpl implements AuthRequirementsService {

}
